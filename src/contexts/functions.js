import { database } from '../firebase';

database.physics_assignments.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc('satyankar.lms@gmail.com')
      .collection('assignments')
      .doc(doc.id)
      .set({
        assigned: doc.data().assigned,
        due: doc.data().due,
        name: doc.data().name,
        points: doc.data().points,
        handout: doc.data().handout,
        completed: 0,
        module: doc.data().module,
        problems: 12,
        submissions: 2,
        earned: 0
      });
  });
});

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_assignments
      .doc('jkNTrDLkd7o00WY8xXEl')
      .collection('questions')
      .doc('1')
      .get()
      .then((doc1) => {
        database.physics_users
          .doc(doc.id)
          .collection('assignments')
          .doc('jkNTrDLkd7o00WY8xXEl')
          .collection('questions')
          .doc('1')
          .update({
            solution: doc1.data().solution
          });
      });
  });
});

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('oK4N0bhBAzosBw6ngmjM')
      .update({
        points: 100
      });
  });
});

database.physics_assignments
  .doc('oK4N0bhBAzosBw6ngmjM')
  .collection('questions')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      database.physics_users.get().then((querySnapshot1) => {
        querySnapshot1.forEach((doc1) => {
          database.physics_users
            .doc(doc1.id)
            .collection('assignments')
            .doc('oK4N0bhBAzosBw6ngmjM')
            .collection('questions')
            .doc(doc.id)
            .set({
              answer: doc.data().answer,
              attempts: 2,
              completed: false,
              number: doc.data().number,
              points: doc.data().points,
              solution: doc.data().solution,
              status: doc.data().status,
              type: doc.data().type
            });
        });
      });
    });
  });

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_assignments
      .doc('Y3oz7TFtLqvPOcXuxOdB')
      .get()
      .then((doc1) => {
        database.physics_users
          .doc(doc.id)
          .collection('assignments')
          .doc('Y3oz7TFtLqvPOcXuxOdB')
          .update({
            handout: ''
          });
      });
  });
});

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('oK4N0bhBAzosBw6ngmjM')
      .get()
      .then((doc1) => {
        if (doc1.exists === false) {
          database.physics_assignments.get().then((querySnapshot) => {
            querySnapshot.forEach((doc2) => {
              database.physics_users
                .doc(doc.id)
                .collection('assignments')
                .doc(doc2.id)
                .set({
                  assigned: doc2.data().assigned,
                  due: doc2.data().due,
                  name: doc2.data().name,
                  points: doc2.data().points,
                  disabled: doc2.data().disabled,
                  handout: doc2.data().handout,
                  completed: 0,
                  module: doc2.data().module,
                  problems: doc2.data().problems,
                  submissions: 2,
                  earned: 0
                });
            });
          });
        }
      });
  });
});

database.physics_assignments
  .doc('s7Opzrn4QzmlQb8dSmiR')
  .collection('questions')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      database.physics_assignments
        .doc('s7Opzrn4QzmlQb8dSmiR')
        .collection('questions')
        .doc(doc.id)
        .set({
          answer: 'A',
          attempts: 2,
          completed: false,
          number: 1,
          points: 5,
          solution: '',
          status: '',
          type: 'SA'
        });
    });
  });
database.physics_assignments
  .doc('x83arrGsjlE4VeEdWAe2')
  .collection('questions')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      database.physics_users.get().then((querySnapshot1) => {
        querySnapshot1.forEach((doc1) => {
          database.physics_users
            .doc(doc1.id)
            .collection('assignments')
            .doc('x83arrGsjlE4VeEdWAe2')
            .collection('questions')
            .doc(doc.id)
            .set({
              answer: doc.data().answer,
              attempts: 2,
              completed: false,
              number: doc.data().number,
              points: doc.data().points,
              solution: doc.data().solution,
              status: doc.data().status,
              type: doc.data().type
            });
        });
      });
    });
  });
database.physics_assignments
  .doc('W55HtIbmeKL2XIJPNerq')
  .get()
  .then((doc) => {
    database.physics_users.get().then((querySnapshot) => {
      querySnapshot.forEach((doc1) => {
        database.physics_users
          .doc(doc1.id)
          .collection('assignments')
          .doc(doc.id)
          .update({
            disabled: false,
            points: doc.data().points,
            problems: doc.data().problems,
            handout: doc.data().handout,
            module: doc.data().module
          });
      });
    });
  });

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('F8Y4hqTkZ1AAl0KkKaYL')
      .collection('questions')
      .doc('2')
      .update({
        solution:
          'https://cdn.discordapp.com/attachments/712062038188228669/860924453219205160/Screen_Shot_2021-07-02_at_6.40.49_PM.png'
      });
  });
});

database.biology_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.users
      .doc(doc.id)
      .get()
      .then((doc1) => {
        database.biology_users.doc(doc.id).update({
          parent1Email: doc1.data().parent1Email,
          parent2Email: doc1.data().parent2Email,
          first_name: doc1.data().first_name,
          last_name: doc1.data().last_name,
          rank: 1
        });
      });
  });
});

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.biology_assignments.get().then((querySnapshot1) => {
      querySnapshot1.forEach((doc1) => {
        database.physics_users
          .doc(doc.id)
          .collection('assignments')
          .doc(doc1.id)
          .delete();
      });
    });
  });
});
database.physics_users.get().then((querySnapshot1) => {
  querySnapshot1.forEach((doc1) => {
    database.physics_users
      .doc(doc1.id)
      .collection('assignments')
      .doc('x83arrGsjlE4VeEdWAe2')
      .collection('questions')
      .doc('12')
      .set({
        attempts: 2,
        completed: false,
        number: 12,
        points: 17,
        solution:
          'https://cdn.discordapp.com/attachments/712062038188228669/862387153774182410/Screen_Shot_2021-07-07_at_1.37.38_PM.png',
        status: '',
        type: 'FR'
      });
  });
});

database.biology_assignments
  .doc('uA0LSIfdYhPWIp2qEGJ6')
  .collection('questions')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      database.biology_users.get().then((querySnapshot1) => {
        querySnapshot1.forEach((doc1) => {
          database.biology_users
            .doc(doc1.id)
            .collection('assignments')
            .doc('uA0LSIfdYhPWIp2qEGJ6')
            .collection('questions')
            .doc(doc.id)
            .update({
              answer: doc.data().answer,
              solution: doc.data().solution
            });
        });
      });
    });
  });
database.physics_users.get().then((querySnapshot1) => {
  querySnapshot1.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('D6PLNCKV1MUeqLx2if7a')
      .collection('questions')
      .doc('6')
      .delete();
  });
});
database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('AeYjvhVeBmhUjV9o4fL1')
      .update({
        problems: 14
      });
  });
});
database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('28Ic2FYolxrGTytKNTb7')
      .collection('questions')
      .doc('3')
      .update({
        answer: 1.625,
        solution:
          'https://cdn.discordapp.com/attachments/712062038188228669/864009577012264990/Screen_Shot_2021-07-12_at_1.01.56_AM.png'
      });
  });
});
database.physics_assignments.get().then((doc) => {
  database.physics_users
    .doc('ananthkashyap4@gmail.com')
    .collection('assignments')
    .doc(doc.id)
    .collection('questions')
    .doc();
});

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('28Ic2FYolxrGTytKNTb7')
      .update({
        handout:
          'https://drive.google.com/file/d/13XUWnp7apjUz-wF7EtRTgdatClZgNgAN/view?usp=sharing'
      });
  });
});
database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users
      .doc(doc.id)
      .collection('assignments')
      .doc('tR7JihaMV4XIOQOMEhGp')
      .collection('questions')
      .doc('1')
      .update({
        answer: 15,
        solution:
          'https://cdn.discordapp.com/attachments/852042847926222848/868628856859394058/unknown.png'
      });
  });
});
database.astronomy_assignments
  .doc('H0H9wFWLqcTSePhHN25b')
  .get()
  .then((doc) => {
    database.astronomy_users.get().then((querySnapshot) => {
      querySnapshot.forEach((doc1) => {
        database.astronomy_users
          .doc(doc1.id)
          .collection('assignments')
          .doc(doc.id)
          .update({
            disabled: false,
            points: doc.data().points,
            problems: doc.data().problems,
            handout: doc.data().handout,
            module: doc.data().module,
            completed: doc.data().completed,
            earned: doc.data().earned
          });
      });
    });
  });
database.math_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.math_users
      .doc(doc.id)
      .collection('assignments')
      .doc('t9EFN3ciAE3E8gyFRGvr')
      .collection('questions')
      .doc('3')
      .update({
        answer: 15,
        solution:
          'https://cdn.discordapp.com/attachments/852042847926222848/868628856859394058/unknown.png'
      });
  });
});
