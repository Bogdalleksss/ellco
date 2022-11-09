export const validatorEmail = {
  required: true,
  min: 6,
  patterns: [
    {
      regex: new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
      errorMsg: 'Please enter a correct email'
    }
  ]
};

export const validatorPassword = (required: boolean) => ({
  min: 6,
  max: 20,
  required
});

export const validatorText = {
  required: true,
  min: 3
};

export const validatorPrice = {
  required: true,
  min: 1
};
