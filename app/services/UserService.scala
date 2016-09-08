package persistence.services

import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.api.LoginInfo
import models.User
import javax.inject.Inject
import reactivemongo.api.DB
import reactivemongo.play.json.collection.JSONCollection
import scala.concurrent.Future
import play.api.libs.json.Json
import scala.concurrent.ExecutionContext.Implicits.global
import reactivemongo.play.json._

class UserService @Inject() (db: DB) extends IdentityService[User] {

  def collection: JSONCollection = db.collection[JSONCollection]("user")

  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = {
    collection.find(Json.obj("loginInfo" -> loginInfo)).one[User]
  }

  def save(user: User): Future[User] = {
    collection.insert(user)
    Future.successful(user)
  }
}