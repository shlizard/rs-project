export default async function asyncHandler(
  asyncFunction,
  ...asyncFunctionParameter
) {
  try {
    const data = await asyncFunction(...asyncFunctionParameter);
    return [data, null];
  } catch (error) {
    return [null, error.errors];
  }
}
