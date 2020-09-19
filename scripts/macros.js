/**
 * Utility functions for macros
 */
function MacrosPF1 () {}


/**
 * Returns the selected actors on scene that the player owns
 * If none selected, returns all the actors that player owns
 */
MacrosPF1.getActors = function () {
  const tokens = canvas.tokens.controlled;
  let actors = tokens.map(o => o.actor);
  if (!actors.length) actors = game.actors.entities.filter(o => o.hasPerm(game.user, "OWNER"));
  actors = actors.filter(o => o.hasPerm(game.user, "OWNER"));
  return actors
}

