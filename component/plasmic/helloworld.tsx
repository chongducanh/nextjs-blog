import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { createClient } from "next-sanity";

export interface HelloWorldProps {
  children?: React.ReactNode;
  className?: string;
  verbose?: boolean;
}

export function HelloWorld({ children, className, verbose }: HelloWorldProps) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    console.log(data);
  },
    [data]);
    const onSubmit = (formData, e) => {
      setData(JSON.stringify(formData));
      const doc = {
        _type:'form',
        ...formData
        }
        client.create(doc).then(res => console.log(`Document was created, document ID is ${res._id}`))
    };
    const onError = (errors, e) => console.log(errors, e);
  return (
    <div className={className} style={{ padding: '20px' }}>
      <h2>Form submission</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input {...register("title")} placeholder="Title" />
          <textarea {...register("description")} placeholder="Description" />
          <p>{data}</p>
          <input type="submit" />
        </form>
    </div>
  );
}

const client = createClient({
  projectId: "jfwywhzz",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
  token:'sknep3Z9yRgvMhfy77ZjEfNkk3dYGeyritvY8eL6sdlp08HcdKXMSEFJ9UakzmlUepiZyRnyJpwEMbQDapLkmI3jeuBiFva3VCjX6sUb38BCcQoNc1ikEGDEuw8eNkXApjSHrAub5zX3faIKTOJcOsBAR4WX71zAMMIApmn63xvOEI9S4EHT'
});