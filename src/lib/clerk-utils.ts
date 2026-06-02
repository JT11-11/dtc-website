export function getClerkErrorMessage(cause: unknown): string {
  if (
    typeof cause === 'object' &&
    cause !== null &&
    'errors' in cause &&
    Array.isArray(cause.errors) &&
    cause.errors[0]?.message
  ) {
    return cause.errors[0].message as string
  }

  if (cause instanceof Error) {
    return cause.message
  }

  return 'Something went wrong. Please try again.'
}
