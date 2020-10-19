const expressJwt = require('express-jwt');

function isAuthenticated(roles = []) {
    // roles param can be a single role string (e.g. Role.ProjectManagers or 'ProjectManagers') 
    // or an array of roles (e.g. [Role.ProjectManagers, Role.Employees] or ['Employees', 'ProjectManagers'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [expressJwt({
        secret: process.env.Jwt_SECRET,
        algorithms: ['HS256'],
        getToken: function fromHeaderOrCookie(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.cookies['AuthToken']) {
                return req.cookies['AuthToken'];
            }
            return null;
        }
    }),
    // authorize based on user role
    (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            // user's role is not authorized
            return res.redirect('/account/login', {error: 'You are not authorize to view this page. Please login to continue'});
        }
        // middleware to make 'user' available to all templates
        res.locals.user = req.user;
        // authentication and authorization successful
        next();
    }
    ];
}

module.exports = {
    isAuthenticated
}