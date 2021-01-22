for pkg in "$@"
do
  printf   "[build-lib] node_modules/$pkg [1/3]"
  yarn --cwd "./node_modules/$pkg" install 1>/dev/null 2>/dev/null
  printf "\r[build-lib] node_modules/$pkg [2/3]"
  yarn --cwd "./node_modules/$pkg" build 1>/dev/null 2>/dev/null
  printf "\r[build-lib] node_modules/$pkg [3/3]\n"
done