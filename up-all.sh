find . -name "docker-compose.yml"|while read fname; do
  docker-compose -f $fname up -d
done
