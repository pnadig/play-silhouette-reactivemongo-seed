package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.json.Json
import play.api.mvc.Controller
import utils.auth.DefaultEnv

import scala.concurrent.Future

/**
 * The basic application controller.
 *
 * @param messagesApi The Play messages API.
 * @param silhouette The Silhouette stack.
 */
class ApplicationController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  /**
   * Returns the user.
   *
   * @return The result to display.
   */
  def user = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  /**
   * Manages the sign out action.
   */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }

  /**
   * Provides the desired template.
   *
   * @param template The template to provide.
   * @return The template.
   */
  def view(template: String) = silhouette.UserAwareAction { implicit request =>
    template match {
      case "home" => NotFound
      case "signUp" => NotFound
      case "signIn" => NotFound
      case "navigation" => NotFound
      case _ => NotFound
    }
  }
}
