# Build Stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Package Stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
# Yahan humne sahi naam (1.0.0.jar) daal diya hai
COPY --from=build /app/target/job-tracker-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
