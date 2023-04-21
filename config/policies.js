/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
 
  // '*': true,
<<<<<<< HEAD
  // AdminController:{
  //   'adminuserLogout': 'Auth',
  // },
  // UserController:{
  //   'LogOut': 'UserAuth',
  //   'user':'UserAuth'
  // },
  // CategoryController:{
  //   '*': 'Auth',
  // },
  // AuthorController:{
  //   '*': 'Auth',
  // },
  // BookController:{
  //   '*': 'Auth',
  // },
  // IssueandreturnbookController:{
  //   '*': 'Auth',
  // }
=======
  AdminController:{
    'adminuserLogout': 'Auth',
  },
  UserController:{
    'LogOut': 'UserAuth',
    'user':'UserAuth'
  },
  CategoryController:{
    '*': 'Auth',
  },
  AuthorController:{
    '*': 'Auth',
  },
  BookController:{
    '*': 'Auth',
  },
  IssueandreturnbookController:{
    '*': 'Auth',
  }
>>>>>>> library

};
