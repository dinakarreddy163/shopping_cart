
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export const generatePdf = () => {
    var index = 0;
    var ItemsForPo = [];
    let linedata = JSON.parse(localStorage.getItem('cartList')!);

    ItemsForPo.push(
        [
            { text: 'S.No', fontSize: 11, alignment: 'left', style: 'tablecolorHeader' },
            { text: 'Item', alignment: 'left', fontSize: 11, style: 'tablecolorHeader' },
            { text: 'Description', alignment: 'left', fontSize: 11, style: 'tablecolorHeader' },
            { text: 'Qty', fontSize: 11, alignment: 'left', style: 'tablecolorHeader' },
            { text: 'Price', fontSize: 11, alignment: 'right', style: 'tablecolorHeader' },
        ]
    )

    for (var i = 0; i < linedata.length; i++) {
        index++;
        ItemsForPo.push([
            { text: '' + index, alignment: 'left' },
            { text: '' + linedata[i].title, alignment: 'left' },
            { text: '' + linedata[i].description, alignment: 'left' },
            { text: '' + linedata[i].qty, alignment: 'left' },
            { text: '' + linedata[i].price, alignment: 'right' },
        ])
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dtd: any = {
        content: [
            { text: ' \nInvoice\n\n', style: 'subheader', alignment: 'center', fontSize: 15, lineHeight: 0.7, },
            {

                columns: [

                    {
                        width: '*',
                        alignment: 'left',
                        stack: [

                            {
                                style: 'h1',
                                text: 'Shop IN',
                                fontSize: 11
                            },
                            {
                                style: 'h2',
                                text: '28-3-88,gandhinagar',
                                fontSize: 10.5
                            },
                            {
                                style: 'h2',
                                text: 'Panjagutta - 50008 - Hyderabad',
                                fontSize: 10.5

                            },
                            {
                                style: 'h2',
                                text: 'India',
                                fontSize: 10.5

                            },

                        ]
                    },

                ],
            },
            [{ text: '\n\n\n  ', alignment: 'left', fontSize: 10, lineHeight: 0.5 }],
            {
                columns: [
                    {
                        width: 'auto',
                        alignment: 'left',
                        stack: [
                            {
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Delivery Address', style: 'tableHeader' }, { text: '', style: 'tableHeader' }],
                                        [{ text: 'G Dinakar', style: 'tableHeader' }, { text: '', style: 'tableHeader' }],
                                        [{ text: 'Hyderabad,India', alignment: 'left', fontSize: 10, }, { text: '', style: 'tableHeader' }],
                                    ]
                                },
                                layout: 'noBorders'
                            },
                        ]
                    },
                    {
                        width: '*',
                        alignment: 'left',
                        stack: [
                            {
                                text: "",
                                fontSize: 11
                            }
                        ]
                    },
                    {
                        width: 'auto',
                        alignment: 'center',
                        stack: [
                            {
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Sales Order#', style: 'tableHeader' }, { text: ':', style: 'tableHeader' }, { text: 'Inv12353', alignment: 'left', fontSize: 10, }],
                                        [{ text: 'Date', style: 'tableHeader' }, { text: ':', style: 'tableHeader' }, { text: new Date(), alignment: 'left', fontSize: 10, }],
                                    ]
                                },
                                layout: 'noBorders'
                            },
                        ]
                    },

                ],
            },
            [{ text: '\n\n\n  ', alignment: 'left', fontSize: 10, lineHeight: 0.5 }],


            [{ text: '\n\n', alignment: 'left', fontSize: 10, lineHeight: 0.5 }],

            {
                border: [true, false, false, false],
                style: 'tableExample',
                alignment: 'center',
                fontSize: 9,

                table: {
                    headerRows: 1,
                    ///style: 'subheader',
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                    body: ItemsForPo
                },
                layout: {
                    hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                    // hLineStyle: function (i:number, node:any) { return {dash: { length: 10, space: 4 }}; },
                    // vLineStyle: function (i:number, node:any) { return {dash: { length: 10, space: 4 }}; },
                    // paddingLeft: function(i:number, node:any) { return 4; },
                    // paddingRight: function(i:number, node:any) { return 4; },
                    // paddingTop: function(i:number, node:any) { return 2; },
                    // paddingBottom: function(i:number, node:any) { return 2; },
                    // fillColor: function (rowIndex, node, columnIndex) { return null; }
                }

            },

        ]
    }

    pdfMake.createPdf(dtd).download("test.pdf");
}


