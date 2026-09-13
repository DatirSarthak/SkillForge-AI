# ================================
# Build Stage
# ================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven configuration first for better Docker layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build Spring Boot executable JAR
RUN mvn clean package -DskipTests


# ================================
# Runtime Stage
# ================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the packaged Spring Boot JAR
COPY --from=build /app/target/*.jar app.jar

# Render uses PORT environment variable
EXPOSE 10000

# Start Spring Boot application
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-10000} -jar app.jar"]