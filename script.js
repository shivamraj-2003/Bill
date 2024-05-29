document.addEventListener('DOMContentLoaded', () => {
    const data = generateData(11); // Generate 55 rows for demonstration
    const rowsPerPage = 10; // Adjust this number to fit rows on a single page if data exceed 10 rows then it goes to 2nd page
    let currentPage = 1;
    const pageCount = Math.ceil(data.length / rowsPerPage);

    const contentDiv = document.getElementById('content');

    for (let i = 0; i < data.length; i += rowsPerPage) {
        const pageData = data.slice(i, i + rowsPerPage);
        const pageDiv = document.createElement('div');
        pageDiv.className = 'container';

        const headerDiv = document.createElement('header');
        headerDiv.innerHTML = `
                    <h1>C.P. TEXTILES</h1>
                    <p>72/36, SUNDARA GANAPATHY STREET, AMMAPET, SALEM -</p>
                    <p>GST NO : 33 *** *** ZB</p>
                `;
        pageDiv.appendChild(headerDiv);

        const mainDiv = document.createElement('main');
        mainDiv.className = 'main';

        const invoiceHeaderDiv = document.createElement('div');
        invoiceHeaderDiv.className = 'invoice-header';
        invoiceHeaderDiv.innerHTML = `
                    <h2>~TAX INVOICE~</h2>
                    <p>Bill No. :- CPT-20</p>
                    <p>Date. :- 2024-04-10</p>
                `;
        mainDiv.appendChild(invoiceHeaderDiv);

        const customerInfoDiv = document.createElement('div');
        customerInfoDiv.className = 'customer-info';
        customerInfoDiv.innerHTML = `
                    <h3>M/s. : ANSARI HANDLOOM</h3>
                    <p>WHOLE SALE CLOTH MARCHANT</p>
                    <p>940, BADI MASJID CHOWK,</p>
                    <p>Ph :</p>
                    <p>GST: 2 *** *** *** ZO</p>
                `;
        mainDiv.appendChild(customerInfoDiv);

        const deliveryInfoDiv = document.createElement('div');
        deliveryInfoDiv.className = 'delivery-info';
        deliveryInfoDiv.innerHTML = `
                    <p>Place Of Supply:-</p>
                    <p>Terms Of Delivery :-</p>
                `;
        mainDiv.appendChild(deliveryInfoDiv);

        const agentInfoDiv = document.createElement('div');
        agentInfoDiv.className = 'agent-info';
        agentInfoDiv.innerHTML = `<p>Agent Name: CHETTIAR TEXTILES AGENCY</p>`;
        mainDiv.appendChild(agentInfoDiv);

        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['SL.', 'Quality', 'Description Of Goods', 'Company', 'Hsn', 'Than P/M', 'Rate', 'Amt', 'Less', 'Add', 'Tot.Amt'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let pageTotal = 0;
        pageData.forEach((row, index) => {
            const tr = document.createElement('tr');
            Object.values(row).forEach((text, idx) => {
                const td = document.createElement('td');
                td.textContent = text;
                tr.appendChild(td);

                if (idx === Object.keys(row).length - 1) {
                    pageTotal += parseFloat(text);
                }
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        // Add total row
        const totalRow = document.createElement('tr');
        const totalLabelCell = document.createElement('td');
        totalLabelCell.colSpan = 10;
        totalLabelCell.textContent = 'Total Amount:';
        totalLabelCell.style.textAlign = 'right';

        const totalAmountCell = document.createElement('td');
        totalAmountCell.textContent = pageTotal.toFixed(2);

        totalRow.appendChild(totalLabelCell);
        totalRow.appendChild(totalAmountCell);
        table.appendChild(totalRow);

        mainDiv.appendChild(table);
        pageDiv.appendChild(mainDiv);

        const footerDiv = document.createElement('footer');
        footerDiv.innerHTML = `
                    <p>Amount in Words : <span id="amountInWords"></span></p>
                    <p>Good sent to : HIND RATTAN</p>
                    <p>L.R.No :</p>
                    <p>L.R.Date : 2024-04-12 12:00:00</p>
                    <p>CASE No:</p>
                    <p>E.&O.E.</p>
                    <p>For: C.P.TEXTILES</p>
                    <div class="page-number">Page ${currentPage} of ${pageCount}</div>
                `;
        if (currentPage < pageCount) {
            const continueSpan = document.createElement('span');
            continueSpan.textContent = ' Continued to Page ' + (currentPage + 1);
            footerDiv.appendChild(continueSpan);
        }
        pageDiv.appendChild(footerDiv);

        contentDiv.appendChild(pageDiv);
        currentPage++;
    }
});

function generateData(count) {
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            sl: i,
            quality: `Quality ${i}`,
            description: `Description of Goods ${i}`,
            company: `Company ${i}`,
            hsn: `HSN ${i}`,
            than: (Math.random() * 10).toFixed(2),
            rate: (Math.random() * 100).toFixed(2),
            amt: (Math.random() * 1000).toFixed(2),
            less: (Math.random() * 50).toFixed(2),
            add: (Math.random() * 50).toFixed(2),
            totalAmt: (Math.random() * 1100).toFixed(2)
        });
    }
    return data;
}