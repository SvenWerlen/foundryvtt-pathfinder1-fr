#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import re
import json

from pathlib import Path


macros = []

files = list(Path("macros").rglob("*.js"))
for filepath in files:
  # read all lines in f
  with open(filepath, 'r') as f:
    content = f.read().split("------------\n")
    if len(content) < 2:
      print("Invalid content: %s" % f)
      continue
    
    infos = content[0]
    macro = content[1]
    
    macroId = re.search('Id: (.*)', infos).group(1).strip()
    macroName = re.search('Name: (.*)', infos).group(1).strip()
    macroIcon = re.search('Icon: (.*)', infos).group(1).strip()
    
    macro = {
      "name": macroName,
      "type": "script",
      "scope": "global",
      "command": macro,
      "img": macroIcon,
      "actorIds": [],
      "_id": macroId
    }
    
    if len(content) >= 3:
      markerTooltip = re.search('MarkerTooltip: (.*)', infos).group(1).strip()
      markerColor = re.search('MarkerColor: (.*)', infos).group(1).strip()
      markerIcon = re.search('MarkerIcon: (.*)', infos).group(1).strip()
      
      macro["flags"] = {
        "macro-marker": {
          "activeData": {
            "icon": markerIcon,
            "tooltip": markerTooltip,
            "colour": markerColor,
            "trigger": content[2]
          }
        }
      }
    
    macros.append(macro)

with open("packs/macros-fr.db", 'w') as df:
  for m in macros:
    df.write(json.dumps(m) + '\n')

