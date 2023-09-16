import { NodeModel } from '@projectstorm/react-diagrams';
import React, { Component } from 'react';
import { NodeType } from '../../../../store/main/mainSlice';


export class VariableNodeModel extends NodeModel {
    variable: any;
    value: any;
    title : any;
    constructor(options: any) {
      super({...options,type : NodeType.VARIABLE})
      this.title  = options.title ;
      this.variable=options.variable ;
      this.value=options.value;
    }
} 

export default VariableNodeModel