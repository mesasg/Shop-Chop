# ---- ETAPA 1: CONSTRUCCIÓN (BUILDER) ----
# Usa una imagen de Maven para compilar la aplicación.
FROM maven:3.9.5-amazoncorretto-21 AS builder

# Establece el directorio de trabajo.
WORKDIR /app

# Copia los archivos de configuración de Maven.
COPY pom.xml .

# Descarga las dependencias del proyecto.
RUN mvn dependency:go-offline

# Copia el resto del código fuente.
COPY . .

# Compila el proyecto y genera el JAR, saltando las pruebas unitarias.
RUN mvn clean package -DskipTests

# ---- ETAPA 2: EJECUCIÓN (FINAL) ----
# Usa una imagen de Eclipse Temurin para ejecutar la aplicación.
FROM eclipse-temurin:21-jre-alpine

# Establece el directorio de trabajo.
WORKDIR /app

# Copia el archivo JAR generado desde la etapa 'builder'.
COPY --from=builder /app/target/shopchop-0.0.1-SNAPSHOT.jar app.jar 


# Expone el puerto de la aplicación.
EXPOSE 8080

# Define el comando de inicio.
ENTRYPOINT ["java", "-jar", "app.jar"]
