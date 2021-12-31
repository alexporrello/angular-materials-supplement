# Basic Table Readme

Basic Table provies a turnkey solution for table implementation accross the Tollhost.

## Contents

[1. Getting Started](#1-getting-started)<br>
[1.1. Create `BasicTable` Definition](#11-create-basictable-Definition)<br>
[1.2. Add `BasicTable` to an Angular Component's Template](#12-add-basictable-to-an-angular-components-template)


## 1. Getting Started

Basic table is Definition-driven, meaning that the view is shaped by a hard-coded Definition,
rather than hand-coded HTML or CSS.

## 1.1. Create `BasicTable` Definition

Basic Table's Definition is heavily typed; so, with the help of our friend IntelliSense,
definition implementation should be relatively straightfoward.


### 1.1.1. `BasicTable` Object

The first step is to create an object and type it as `BasicTable`:

```typescript
public basicDefinition: BasicTable = { };
```

### 1.1.2. `Cells` Objects

`BasicTable` type has one required field: `cells`:

```typescript
public basicDefinition: BasicTable = {
    cells: []
};
```

`Cells` is an array of `BasicTableCell` objects. Each `BasicTableCell` in the array
corresponds to a table column and has two required fields:

| Field   | Description |
|---------|-------------|
| `field` | The name of the field whose data is to be displayed in the column. |
| `label` | The column header. |

### 1.1.3. Creating a Basic Definition

Let's create a definition for the following data response:

```json
[
    {
      "plazaID": "15",
      "plazaCode": "T15",
      "facilityName": "NCTA RTCS",
      "laneNumber": "4",
    },
    {
      "plazaID": "16",
      "plazaCode": "T16",
      "facilityName": "NCTA RTCS",
      "laneNumber": "2",
    }
    // It just keeps on going...
]
```
Its definition would look like the following:

```typescript
public basicDefinition: BasicTable = {
    cells: [
        {
            field: 'plazaID',
            label: 'Plaza ID'
        },
        {
            field: 'plazaCode',
            label: 'Plaza Acronym'
        },
        {
            field: 'facilityName',
            label: 'Facility Name'
        }
        {
            field: 'laneNumber',
            label: 'Lane Number'
        }
    ]
};
```

On its most basic level, that's all there is to it. For 
more information about optional fields for both `BasicTable`
and `BasicTableCell`, see the API section of this documentation.

<!-- TODO -->

<!-- ### 1.1.4. Definition Location -->

<!-- There are a few options for where you can store the table definition.
For smaller definitions, such as the one above, I find it works to store it
in the components `.ts`. For larger components, however, I find it easier
to create a  -->

## 1.2. Add `BasicTable` to an Angular Component's Template

The `app-basic-table` component has a number of inputs that are
described in the API section of this documentation. At its most basic level,
`app-basic-table` has two required inputs:

|Input Name|Input Description|
|-|-|
| `tableDefinition` | The definition that we created in [Section 1.1.](#11-create-basictable-Definition)). |
| `data` | The array of response data. Each object in the array is a row. |

Adding `app-basic-table` to the template is no different than adding a component
to any other Angular template:

```typescript
@Component({
  selector: 'app-demo-component',
  template: `
    <app-basic-table
      [tableDefinition]="basicDefinition"
      [data]="tableData">
    </app-basic-table>
  `,
  styleUrls: ['./demo.component.scss']
})
```

## 1.2.1. 