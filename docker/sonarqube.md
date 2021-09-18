# SonarQube

## Instalación

```
docker network create red-sonarqube
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube --network red-sonarqube
```

## Para acceder a la interfaz gráfica

- url: http://localhost:9000
- usuario: admin
- contraseña: admin

## Descargar el sonar-scanner

[clic para descargar sonar-scanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

## Ejecutar sonar-scanner

```
sonar-scanner
```

## Ejecutar sonar-scanner usando Docker

```
docker run --rm -e SONAR_HOST_URL="http://sonarqube:9000" -e SONAR_LOGIN="8cc15f8f04554bf4189a73be12364fac157f7fce" -v ${PWD}:/usr/src --network red-sonarqube sonarsource/sonar-scanner-cli
```
