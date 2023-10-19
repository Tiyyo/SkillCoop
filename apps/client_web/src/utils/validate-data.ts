import { AnyZodObject } from 'schema';
import schema from 'schema';
const { ZodError } = schema;

function validateData(schema: AnyZodObject, data: Record<string, any>) {
  const isValid = schema.safeParse(data);
  if (isValid.success) {
    console.log('Data is valid');
  }
  else {
    if (isValid.error instanceof ZodError)
      console.log('something went wrong');
  }
  console.log(isValid);
  return 'Coucou'
}

export default validateData;
