module.exports = {
    getStylesheets: (page) => {
        switch (page) {
            case "homepage":
                return `
                    <link href="cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
                    <link href="${process.env.SERVER_URL}/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Font Awesome -->
                    <link href="${process.env.SERVER_URL}/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
                    <!-- NProgress -->
                    <link href="${process.env.SERVER_URL}/vendors/nprogress/nprogress.css" rel="stylesheet">
                    <!-- iCheck -->
                    <link href="${process.env.SERVER_URL}/vendors/iCheck/skins/flat/green.css" rel="stylesheet">
                    <!-- bootstrap-progressbar -->
                    <link href="${process.env.SERVER_URL}/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
                    <!-- JQVMap -->
                    <link href="${process.env.SERVER_URL}/vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>
                    <!-- bootstrap-daterangepicker -->
                    <link href="${process.env.SERVER_URL}/vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">

                    <!-- Custom Theme Style -->
                    <link href="${process.env.SERVER_URL}/stylesheets/custom.css" rel="stylesheet">    
                `
            case "table":
                return `
                    <!-- Bootstrap -->
                    <link href="cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
                    <link href="${process.env.SERVER_URL}/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Font Awesome -->
                    <link href="${process.env.SERVER_URL}/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
                    <!-- NProgress -->
                    <link href="${process.env.SERVER_URL}/vendors/nprogress/nprogress.css" rel="stylesheet">
                    <!-- iCheck -->
                    <link href="${process.env.SERVER_URL}/vendors/iCheck/skins/flat/green.css" rel="stylesheet">
                    <!-- Datatables -->
                    <link href="${process.env.SERVER_URL}/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
                    <link href="${process.env.SERVER_URL}/vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
                    <link href="${process.env.SERVER_URL}/vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
                    <link href="${process.env.SERVER_URL}/vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
                    <link href="${process.env.SERVER_URL}/vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">

                    <!-- Custom Theme Style -->
                    <link href="${process.env.SERVER_URL}/stylesheets/custom.css" rel="stylesheet">
                `
            default:
                return `
                    <link href="${process.env.SERVER_URL}/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Font Awesome -->
                    <link href="${process.env.SERVER_URL}/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
                    <!-- NProgress -->
                    <link href="${process.env.SERVER_URL}/vendors/nprogress/nprogress.css" rel="stylesheet">
                    <!-- Custom Theme Style -->
                    <link href="${process.env.SERVER_URL}/stylesheets/custom.min.css" rel="stylesheet">
                    <link href="${process.env.SERVER_URL}/vendors/dropzone/dist/min/dropzone.min.css" rel="stylesheet">
                `
        }
    },

    getJavascripts: (page) => {
        switch (page) {
            case "homepage":
                return `
                    <!-- jQuery -->
                    <script src="${process.env.SERVER_URL}/vendors/jquery/dist/jquery.min.js"></script>
                    <!-- Bootstrap -->
                    <script src="${process.env.SERVER_URL}/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- FastClick -->
                    <script src="${process.env.SERVER_URL}/vendors/fastclick/lib/fastclick.js"></script>
                    <!-- NProgress -->
                    <script src="${process.env.SERVER_URL}/vendors/nprogress/nprogress.js"></script>
                    <!-- Chart.js -->
                    <script src="${process.env.SERVER_URL}/vendors/Chart.js/dist/Chart.min.js"></script>
                    <!-- jQuery Sparklines -->
                    <script src="${process.env.SERVER_URL}/vendors/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
                    <!-- morris.js -->
                    <script src="${process.env.SERVER_URL}/vendors/raphael/raphael.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/morris.js/morris.min.js"></script>
                    <!-- gauge.js -->
                    <script src="${process.env.SERVER_URL}/vendors/gauge.js/dist/gauge.min.js"></script>
                    <!-- bootstrap-progressbar -->
                    <script src="${process.env.SERVER_URL}/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
                    <!-- iCheck -->
                    <script src="${process.env.SERVER_URL}/vendors/iCheck/icheck.min.js"></script>
                    <!-- Skycons -->
                    <script src="${process.env.SERVER_URL}/vendors/skycons/skycons.js"></script>
                    <!-- Flot -->
                    <script src="${process.env.SERVER_URL}/vendors/Flot/jquery.flot.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/Flot/jquery.flot.pie.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/Flot/jquery.flot.time.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/Flot/jquery.flot.stack.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/Flot/jquery.flot.resize.js"></script>
                    <!-- Flot plugins -->
                    <script src="${process.env.SERVER_URL}/vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/flot.curvedlines/curvedLines.js"></script>
                    <!-- DateJS -->
                    <script src="${process.env.SERVER_URL}/vendors/DateJS/build/date.js"></script>
                    <!-- bootstrap-daterangepicker -->
                    <script src="${process.env.SERVER_URL}/vendors/moment/min/moment.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/bootstrap-daterangepicker/daterangepicker.js"></script>
                    <script src="${process.env.SERVER_URL}/javascripts/custom.js"></script>
                `
            case "table":
                return `
                    <!-- jQuery -->
                    <script src="${process.env.SERVER_URL}/vendors/jquery/dist/jquery.min.js"></script>
                    <!-- Bootstrap -->
                    <script src="${process.env.SERVER_URL}/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- FastClick -->
                    <script src="${process.env.SERVER_URL}/vendors/fastclick/lib/fastclick.js"></script>
                    <!-- NProgress -->
                    <script src="${process.env.SERVER_URL}/vendors/nprogress/nprogress.js"></script>
                    <!-- iCheck -->
                    <script src="${process.env.SERVER_URL}/vendors/iCheck/icheck.min.js"></script>
                    <!-- Datatables -->
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net/js/jquery.dataTables.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/datatables.net-scroller/js/dataTables.scroller.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/jszip/dist/jszip.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/pdfmake/build/pdfmake.min.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/pdfmake/build/vfs_fonts.js"></script>
                    <script src="${process.env.SERVER_URL}/javascripts/custom.js"></script>
                `
            default:
                return `
                    <!-- jQuery -->
                    <script src="${process.env.SERVER_URL}/vendors/jquery/dist/jquery.min.js"></script>
                    <!-- Bootstrap -->
                    <script src="${process.env.SERVER_URL}/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- FastClick -->
                    <script src="${process.env.SERVER_URL}/vendors/fastclick/lib/fastclick.js"></script>
                    <!-- NProgress -->
                    <script src="${process.env.SERVER_URL}/vendors/nprogress/nprogress.js"></script>
                    <script src="${process.env.SERVER_URL}/vendors/dropzone/dist/min/dropzone.min.js"></script>
                    <script src="${process.env.SERVER_URL}/javascripts/custom.js"></script>
                `
        }
    }
}