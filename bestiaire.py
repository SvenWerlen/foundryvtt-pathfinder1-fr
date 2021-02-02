#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import re
import json

DEFIMG = "icons/svg/mystery-man.svg"

def stripPath(path):
  return path.split("?")[0]

with open('bestiary-fr.db', "r") as pack:
  with open('packs/bestiary-fr.db', "w") as packOut:
    with open('packs/bestiary-img.json', "w") as imgOut:
      images = []

      for line in pack: 
        data = json.loads(line)
        
        img = DEFIMG
        tokenImg = DEFIMG
        
        if "img" in data:
          img = stripPath(data["img"]) if "?" in data["img"] else data["img"]
          del(data["img"])
        if "img" in data["token"]:
          tokenImg = stripPath(data["token"]["img"]) if "?" in data["token"]["img"] else data["token"]["img"]
          del(data["token"]["img"])
        
        images.append({ "id": data["_id"], "img": img, "token": tokenImg })
            
        packOut.write(json.dumps(data, separators=(',', ':')))
        packOut.write("\n")

      imgOut.write(json.dumps(images, separators=(',', ':')))
