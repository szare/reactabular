/* eslint-disable no-console, react/prop-types */
import React from 'react';
import uuid from 'uuid';

import { Table, editors } from '../../src';

import countries from '../data/countries';

const data = [
  {
    name: 'Boolean',
    editor: editors.boolean(),
    code: 'editors.boolean()',
    description: `If initial value is true,
      allows setting to false and vice versa.
      Demo value defaults to false always.`,
    id: uuid.v4(),
  },
  {
    name: 'Dropdown',
    editor: editors.dropdown({
      options: countries,
    }),
    code: 'editors.dropdown({ options: countries })',
    description: `The dropdown expects an array
      of value-name object pairs and emits
      the selected one.`,
    id: uuid.v4(),
  },
  {
    name: 'Customized dropdown',
    editor: editors.dropdown({
      options: countries,
      fields: {
        // reversing fields to show the API
        name: 'value',
        value: 'name',
      },
    }),
    code: 'editors.dropdown({ options: countries, fields: {name: <name>, value: <value>} })',
    description: 'This dropdown uses custom field definition.',
    id: uuid.v4(),
  },
  {
    name: 'Input',
    editor: editors.input(),
    code: 'editors.input()',
    description: 'Just a wrapper for a regular input.',
    id: uuid.v4(),
  },
];

const columns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'editor',
    header: 'Editor',
    cell: ({ value }) => React.createElement(value, {
      value: '',
      onValue: v => console.log(v),
    }),
  },
  {
    property: 'code',
    header: 'Code',
  },
  {
    property: 'description',
    header: 'Description',
  },
];

const EditorsTable = () => (
  <Table
    className="pure-table pure-table-striped"
    columns={columns}
    data={data}
  >
    <Table.Header />

    <Table.Body rowKey="id" />
  </Table>
);

export default EditorsTable;