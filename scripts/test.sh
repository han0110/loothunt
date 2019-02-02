shut() {
  GANACHE_PID="$(ps -ef | grep "[g]anache-cli" | awk '{print $2}')"
  if [ "$GANACHE_PID" != "" ]
    then
      echo -e ""
      echo "killing existing ganache-cli process $GANACHE_PID"
      echo -e ""
      kill -9 $GANACHE_PID
  fi
}

boot() {
  shut

  ./node_modules/.bin/ganache-cli \
   > /dev/null &
  GANACHE_PID=$!
  echo -e ""
  echo "started new ganache-cli process $GANACHE_PID"
  echo -e ""
  sleep 1
}

jest() {
  ./node_modules/.bin/jest $@
}

boot
jest $@
shut
