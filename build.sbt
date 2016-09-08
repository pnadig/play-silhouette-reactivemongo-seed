name := "play-silhouette-reactivemongo-seed"

scalaVersion := "2.11.8"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += Resolver.jcenterRepo

libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % "4.0.0",
  "com.mohiva" %% "play-silhouette-persistence" % "4.0.0",
  "com.mohiva" %% "play-silhouette-password-bcrypt" % "4.0.0",
  "com.mohiva" %% "play-silhouette-crypto-jca" % "4.0.0",
  "net.codingwell" %% "scala-guice" % "4.1.0",
  "com.iheart" %% "ficus" % "1.2.6",
  "org.reactivemongo" %% "play2-reactivemongo" % "0.11.14",
  cache,
  filters
)

routesGenerator := InjectedRoutesGenerator

fork in run := true