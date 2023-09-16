import React from 'react';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

interface CustomLinkProps {
  link: DefaultLinkModel;
  onDelete: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({ link, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <div>{link.getSourcePort()?.getName()}</div>
      <div>{link.getTargetPort()?.getName()}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CustomLink;
