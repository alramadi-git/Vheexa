using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations;

public static class ImageValidation
{

    public static IRuleBuilderOptions<T, ImageCreateRequestDTO?> ImageCreate<T>(this IRuleBuilder<T, ImageCreateRequestDTO?> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(image => image
            .RuleFor(image => image!.URL)
            .NotEmpty().WithMessage("URL is required.")
        )
        .When(image => image != null);
    }

    public static IRuleBuilderOptions<T, ImageUpdateRequestDTO?> ImageUpdate<T>(this IRuleBuilder<T, ImageUpdateRequestDTO?> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(image => image
            .RuleFor(image => image!.URL)
            .NotEmpty().WithMessage("URL is required.")
        )
        .When(image => image != null);
    }
}
