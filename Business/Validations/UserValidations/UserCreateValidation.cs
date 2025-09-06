using DataAccess.RequestDTOs.CreateRequestDTOs;
using FluentValidation;

namespace Business.Validations.UserValidations;

public class UserCreateValidation : AbstractValidator<UserCreateRequestDTO>;