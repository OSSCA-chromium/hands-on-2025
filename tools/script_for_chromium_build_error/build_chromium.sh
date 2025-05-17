#!/bin/bash

res=127

while [ $res -ne 0 ]
do
  autoninja -C out/Default chrome
  res=$?
done