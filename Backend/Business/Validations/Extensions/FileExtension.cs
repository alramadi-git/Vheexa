using FluentValidation;

using Microsoft.AspNetCore.Http;

namespace Business.Validations.Extensions;

public static class FileExtension
{
    public static IRuleBuilderOptions<T, IFormFile> Type<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, string type)
    {
        return ruleBuilder
        .Must(file => file.ContentType.StartsWith(type))
        .WithMessage($"File type must be of {type}.");
    }

    public static IRuleBuilderOptions<T, IFormFile> MaxKBSize<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, int size)
    {
        return ruleBuilder
        .Must(file => file.Length <= size * 1024 )
        .WithMessage($"File size must be of less than {size} KB.");
    }
    public static IRuleBuilderOptions<T, IFormFile> MaxMBSize<T>(this IRuleBuilder<T, IFormFile> ruleBuilder, int size)
    {
        return ruleBuilder
        .Must(file => file.Length <= size * 1024 * 1024)
        .WithMessage($"File size must be of less than {size} MB.");
    }
}