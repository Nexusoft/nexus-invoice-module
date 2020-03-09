import ReactTable from 'react-table';
const {
  libraries: { React },
} = NEXUS;
const Table = ({ data, columns, defaultSortingColumnIndex, ...rest }) => (
  <ReactTable
    noDataText={'No Rows Found'}
    data={data}
    pageText={'Page'}
    columns={columns}
    defaultSorted={[{ ...columns[defaultSortingColumnIndex], desc: true }]}
    rowsText={'rows'}
    previousText={'< ' + 'Previous'}
    nextText={'Next' + ' >'}
    {...rest}
    className={`-striped -highlight ${rest.className}`}
  />
);

export default Table;
