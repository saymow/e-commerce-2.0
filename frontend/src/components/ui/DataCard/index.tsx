import React from "react";
import styled from "styled-components";

export const Section = styled.article`
  display: flex;
  flex-direction: column;

  h3 {
    text-transform: uppercase;
    font-size: 1.4rem;
    text-align: center;
    line-height: 2.2rem;
  }

  border: 1px solid var(--lighter-Grey);

  margin: 1rem 0;
  padding: 1rem;
`;

export const SectionField = styled.div`
  display: flex;
  align-items: center;

  strong {
    text-transform: uppercase;
    margin-right: 0.5rem;
  }

  strong,
  p {
    font-size: 1.2rem;
  }
`;

export interface DataCardField {
  label: string;
  value: string | number;
}

interface Props {
  title: string;
  fields: DataCardField[];
}

const DataCard: React.FC<Props> = (props) => {
  const {title,fields} = props;

  return (
    <Section>
      <h3>{title}</h3>
      {fields.map((field) => (
        <SectionField key={field.label}>
          <strong>{field.label}:</strong>
          <p>{field.value}</p>
        </SectionField>
      ))}
    </Section>
  );
};

export default DataCard;
