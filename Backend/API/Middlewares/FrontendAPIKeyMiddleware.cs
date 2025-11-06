
using API.Configurations;
using API.Models;

namespace API.Middlewares;

public class FrontendAPIKeyMiddleware : IMiddleware
{
    private readonly string _APIKey;

    public FrontendAPIKeyMiddleware(ApiKeys apiKeySettings)
    {
        _APIKey = apiKeySettings.Frontend;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        bool doesContainAPIKey = context.Request.Headers.TryGetValue("X-Api-Key", out var contextAPIKey);

        if (!doesContainAPIKey || !contextAPIKey.Contains(_APIKey, StringComparer.Ordinal))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            var message = !doesContainAPIKey ? "X-Api-Key is missing." : "X-Api-Key is invalid.";

            var response = new FailedModel(context.Response.StatusCode, message);
            await context.Response.WriteAsJsonAsync(response);
            return;
        }

        await next(context);
    }
}