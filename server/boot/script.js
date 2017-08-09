'use strict';

module.exports = function(app) {
  var superUser = {
    email: 'jburgos@applaudostudios.com',
    password: process.env.SUPERUSER_PASSWORD
  };

  var user = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  user.create(superUser, function(err, user) {
    if (err) throw err;

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id
      }, function(err, principal) {
        if (err) throw err;
      });
    });
  });
}
