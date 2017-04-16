var studentsWithBrokenApparatuses = JSON.parse(localStorage.getItem('brokenApparatus'))
function convertArrayOfObjectsToCSV(studentsWithBrokenApparatuses) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = studentsWithBrokenApparatuses.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = studentsWithBrokenApparatuses.columnDelimiter || ',';
        lineDelimiter = studentsWithBrokenApparatuses.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
    function downloadCSV(args) {  
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: studentsWithBrokenApparatuses
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }