# Walk Doggers app

## Frontend Requirements

* [Expo](https://docs.expo.io/).

### To start:

```bash
expo start
```

### To run expo in wsl2 in docker:
```bash
 # ! change REACT_NATIVE_PACKAGER_HOSTNAME to your (local) ip addr !
docker run -it --rm \
-p 19000:19000 -p 19001:19001 -p 19002:19002 -v "$PWD:/app" \
-e REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.124 \
-e EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
--name=walk-doggers-expo kerbe/expo start
# now scan the qr code with your device
```
