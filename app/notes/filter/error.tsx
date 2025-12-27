'use client';

type Props = {
  error: Error;
};


const Error  = ({ error }: Props) => {
  return (
        <p >  There is an error. Please, try again. {error.message} </p>
   
  );
}

export default Error;