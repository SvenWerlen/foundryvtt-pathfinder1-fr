#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import re
import json

DEFPATH = "bestiary/"
DEFIMG = "icons/svg/mystery-man.svg"

def stripPath(path):
  return DEFPATH + path.split("?")[0].replace(".png", ".webp")

with open('bestiary-fr.db', "r") as pack:
  with open('packs/bestiary-fr.db', "w") as pack1Out:
    with open('packs/bestiary2-fr.db', "w") as pack2Out:
      #with open('packs/bestiary-img.json', "w") as imgOut:
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
          
          #images.append({ "id": data["_id"], "img": img, "token": tokenImg })
              
          pack1Out.write(json.dumps(data, separators=(',', ':')))
          pack1Out.write("\n")
          
          data["img"] = img
          data["token"]["img"] = tokenImg
          
          pack2Out.write(json.dumps(data, separators=(',', ':')))
          pack2Out.write("\n")
          

        #imgOut.write(json.dumps(images, separators=(',', ':')))
