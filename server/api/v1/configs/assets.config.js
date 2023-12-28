module.exports = {
    getStylesheets: (page) => {
        switch (page) {
            case "homepage":
                return ``
            default:
                return `
                    <!-- Bootstrap -->
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
        }
    },

    getJavascripts: (page) => {
        switch (page) {
            case "homepage":
                return ``
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
        }
    }
}