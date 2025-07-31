ej.treegrid.TreeGrid.Inject(ej.treegrid.VirtualScroll,ej.treegrid.Toolbar,ej.treegrid.ExcelExport,ej.treegrid.PdfExport);
const excelAggregateQueryCellInfo = (args) => {
    if (args.cell.column.headerText === "Category") {
        args.style.value = `Count of Frozen seafood is ${args.row.data.category.Custom}`;
    }

};
const pdfAggregateQueryCellInfo = (args) => {
    if (args.cell.column.headerText === "Category") {
        args.value = `Count of Frozen seafood is ${args.row.data.category.Custom}`;
    }

};
var summaryData = [
    {
        ID: '1',
        Name: 'Order 1',
        units: '1395',
        unitPrice: '47',
        price: '13366',
        subtasks: [
            { ID: '1.1', Name: 'Mackerel', category: 'Frozen seafood', units: '235', unitPrice: '12', price: '2820' },
            { ID: '1.2', Name: 'Yellowfin Tuna', category: 'Frozen seafood', units: '324', unitPrice: '8', price: '2592' },
            { ID: '1.3', Name: 'Herrings', category: 'Frozen seafood', units: '488', unitPrice: '11', price: '5268' },
            { ID: '1.4', Name: 'Preserved Olives', category: 'Edible', units: '125', unitPrice: '9', price: '1125' },
            { ID: '1.5', Name: 'Sweet corn Frozen', category: 'Edible', units: '223', unitPrice: '7', price: '1561' }
         ]
    },
    {
        ID: '2',
        Name: 'Order 2',
        units: '1944',
        unitPrice: '58',
        price: '21233',
        subtasks: [
            { ID: '2.1', Name: 'Tilapias', category: 'Frozen seafood', units: '278', unitPrice: '15', price: '4170' },
            { ID: '2.2', Name: 'White Shrimp', category: 'Frozen seafood', units: '560', unitPrice: '7', price: '3920' },
            { ID: '2.3', Name: 'Fresh Cheese', category: 'Dairy', units: '323', unitPrice: '12', price: '3876' },
            { ID: '2.4', Name: 'Blue Veined Cheese', category: 'Dairy', units: '370', unitPrice: '15', price: '5550' },
            { ID: '2.5', Name: 'Butter', category: 'Dairy', units: '413', unitPrice: '9', price: '3717' }
        ]
    },
    {
        ID: '3',
        Name: 'Order 3',
        units: '1120',
        unitPrice: '33',
        price: '10880',
        subtasks: [
            { ID: '3.1', Name: 'Lead glassware', category: 'Solid crystals', units: '542', unitPrice: '6', price: '3252' },
            { ID: '3.2', Name: 'Pharmaceutical Glassware', category: 'Solid crystals', units: '324', unitPrice: '11', price: '3564' },
            { ID: '3.3', Name: 'Glass beads', category: 'Solid crystals', units: '254', unitPrice: '16', price: '4064' }
        ]
    }

];

var footer = (data) => {
    
    return `<span> Count ${data.Custom}</span>`;
};
var customAggregateFn = (data) => {return 5}
var treegrid = new ej.treegrid.TreeGrid({
    dataSource: summaryData,
        childMapping: 'subtasks',
        width: 'auto',
        height: 400,
        treeColumnIndex: 1,
        allowExcelExport: true,
        allowPdfExport:true,
        pdfAggregateQueryCellInfo:pdfAggregateQueryCellInfo,
        excelAggregateQueryCellInfo:excelAggregateQueryCellInfo,
        toolbar: ['ExcelExport', 'CsvExport', 'PdfExport'],
        
        columns: [
            { field: 'ID', headerText: 'S.No', width: 90, textAlign: 'Right' },
            { field: 'Name', headerText: 'Shipment Name', width: 100 },
            { field: 'category', headerText: 'Category', width: 100, },
            { field: 'units', headerText: 'Total Units', width: 100,  textAlign: 'Right' },
            { field: 'unitPrice', headerText: 'Unit Price($)', width: 110,   textAlign: 'Right' },
            { field: 'price', headerText: 'Price($)', width: 110, textAlign: 'Right', },
        ],
        aggregates: [{
            showChildSummary: false,
            columns: [{
                type: 'Custom',
                customAggregate: customAggregateFn,
                columnName: 'category',
                footerTemplate: footer
            }]
        }],
    
    });
    treegrid.appendTo('#TreeGrid');
    treegrid.toolbarClick= (args)=>{ switch (args.item.id) {
        
        case treegrid.grid.element.id + "_excelexport":
          
        treegrid.excelExport();
          break;
        case treegrid.grid.element.id + "_pdfexport":
            treegrid.pdfExport();
          break;
      }
    }