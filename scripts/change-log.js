import "/systems/pf1/module/lib/markdown/markdown-it.js";
import { SemanticVersion } from "/systems/pf1/module/semver.js";

export class ChangeLogWindow extends FormApplication {
  constructor(lastVersion) {
    super({}, {});

    this.lastVersion = lastVersion;
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    return mergeObject(options, {
      id: "changelog",
      classes: ["pf1", "changelog"],
      template: "systems/pf1/templates/apps/changelog.hbs",
      width: 500,
      submitOnChange: true,
      closeOnSubmit: false,
    });
  }

  get title() {
    return `Pathfinder 1 FR ~ ${game.i18n.localize("PF1.Changelog")}`;
  }

  async getData() {
    let data = await super.getData();

    data.dontShowAgain = game.settings.get("pf1-fr", "dontShowChangelog");

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "modules/pf1-fr/CHANGELOG.md");

    let promise = new Promise((resolve) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          data.changelog = this._processChangelog(xhr.response);
          resolve(data);
        }
      };
    });
    xhr.send(null);

    return promise;
  }

  _processChangelog(md) {
    const MD = window.markdownit();

    // Cut off irrelevant changelog entries
    let lines = md.split(/[\n\r]/);
    if (this.lastVersion) {
      for (let a = 0; a < lines.length; a++) {
        let line = lines[a];
        if (line.match(/##\s+([0-9]+\.[0-9]+\.[0-9]+)/)) {
          const version = SemanticVersion.fromString(RegExp.$1);
          if (!version.isHigherThan(this.lastVersion)) {
            lines = lines.slice(0, a);
            break;
          }
        }
      }
    }

    return MD.render(lines.join("\n"));
  }

  async _updateObject(event, formData) {
    if (formData.dontShowAgain != null) {
      await game.settings.set("pf1-fr", "dontShowChangelog", formData.dontShowAgain);
    }
  }
}
