import {
  AlignmentType,
  Document,
  Header,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  TabStopType,
  TextRun,
  TextWrappingType,
  UnderlineType,
  VerticalPositionRelativeFrom,
} from 'docx';

export async function BarangayClearance(
  firstName,
  lastName,
  middleName = '',
  age,
  status,
  capt,
  yearNow
) {
  const logo1 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/caramutan-logo.png'
  ).then((r) => r.blob());
  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/lapaz-logo.png'
  ).then((r) => r.blob());
  console.log('inside create');
  console.log(logo1);

  return new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo1,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.LEFT_MARGIN,
                        offset: 1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Republic of the Philippines',
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Province of Tarlac',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Municipality of La Paz',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'BARANGAY CARAMUTAN',
                    bold: true,
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Telephone no. 606-1265',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'officialbarangaycaramutan123@yahoo.com.ph',
                    underline: { type: UnderlineType.SINGLE },
                    break: 1,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo2,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
                        offset: -1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            position: {
              spacing: {
                before: 600,
              },
            },
            children: [
              new TextRun({
                text: 'OFFICE OF THE PUNONG BARANGAY',
                size: 28,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 600,
            },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'BARANGAY CLEARANCE', size: 48, bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 1600,
            },
            children: [
              new TextRun({
                text: 'TO WHOM IT MAY CONCERN:',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    This is to certify that',
                size: 22,
              }),
              new TextRun({
                text: `  ${firstName} ${middleName} ${lastName}  `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: `, `,
                size: 22,
              }),
              new TextRun({
                text: `  ${age} `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: 'years old, ',
                size: 22,
              }),
              new TextRun({
                text: ` ${status} `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: ' and a resident of Barangay Caramutan, La Paz, Tarlac is known to be of good moral character and law-abiding citizen in the community.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: '    To certify further, that he/she has no derogatory and/or criminal records filed in this barangay.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                size: 22,
                text: '    ISSUED',
                bold: true,
              }),
              new TextRun({
                size: 22,
                text: ` this _______ day of ______________________, ${yearNow} at Barangay Caramutan, La Paz, Tarlac upon request of the interested party for whatever legal purposes it may serve.`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 900,
            },
            children: [
              new TextRun({
                text: `   ${capt}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                bold: true,
                size: 28,
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: 'PUNONG BARANGAY', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({ text: 'O.R No.	___________________', size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: 'Date Issued:	___________________',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [new TextRun({ text: 'Doc. Stamp:	Paid', size: 24 })],
          }),
        ],
      },
    ],
  });
}

export async function BarangayResidency(
  firstName,
  lastName,
  middleName = '',
  age,
  status,
  capt,
  year
) {
  const logo1 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/caramutan-logo.png'
  ).then((r) => r.blob());
  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/lapaz-logo.png'
  ).then((r) => r.blob());
  console.log('inside create');
  console.log(logo1);

  return new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo1,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.LEFT_MARGIN,
                        offset: 1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Republic of the Philippines',
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Province of Tarlac',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Municipality of La Paz',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'BARANGAY CARAMUTAN',
                    bold: true,
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Telephone no. 606-1265',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'officialbarangaycaramutan123@yahoo.com.ph',
                    underline: { type: UnderlineType.SINGLE },
                    break: 1,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo2,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
                        offset: -1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            position: {
              spacing: {
                before: 600,
              },
            },
            children: [
              new TextRun({
                text: 'OFFICE OF THE PUNONG BARANGAY',
                size: 28,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 600,
            },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'BARANGAY RESIDENCY', size: 48, bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 1600,
            },
            children: [
              new TextRun({
                text: 'TO WHOM IT MAY CONCERN:',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    This is to certify',
                size: 22,
                bold: true,
                allCaps: true,
              }),
              new TextRun({
                text: `, that, `,
                size: 22,
              }),
              new TextRun({
                text: `  ${firstName} ${middleName} ${lastName}  `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: `, `,
                size: 22,
              }),
              new TextRun({
                text: `  ${age} `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: 'years of age, ',
                size: 22,
              }),
              new TextRun({
                text: ` ${status} `,
                size: 22,
                underline: {
                  type: UnderlineType.THICK,
                  color: '000000',
                },
              }),
              new TextRun({
                text: ` a natural born Filipino, is a bona fide resident of Barangay Caramutan, La Paz, Tarlac.`,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: '    This further certifies that he/she is a law abiding citizen, of good moral character and reputation. That he/she has no derogatory record or pending case filed against him in this barangay.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                size: 22,
                text: '     This certification is issued upon the request of the above-mentioned name for whatever legal intent this may serve.',
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                size: 22,
                text: ` Issued this _______ day of ______________________, ${year} at Barangay Caramutan, La Paz, Tarlac upon request of the interested party for whatever legal purposes it may serve.`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 900,
            },
            children: [
              new TextRun({
                text: `   ${capt}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                bold: true,
                size: 28,
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: 'PUNONG BARANGAY', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 800,
            },
            children: [
              new TextRun({
                text: 'Note: This certification is validated with an official sealed does not have alteration. In case of alteration, it is countersigned by the issuing officer.	',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: 'Official Seal',
                size: 22,
              }),
            ],
          }),
        ],
      },
    ],
  });
}

export async function CertificateIndigency(
  firstName,
  lastName,
  middleName = '',
  age,
  status,
  capt,
  year,
  purok = ''
) {
  const logo1 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/caramutan-logo.png'
  ).then((r) => r.blob());
  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/lapaz-logo.png'
  ).then((r) => r.blob());
  console.log('inside create');
  console.log(logo1);

  return new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo1,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.LEFT_MARGIN,
                        offset: 1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Republic of the Philippines',
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Province of Tarlac',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Municipality of La Paz',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'BARANGAY CARAMUTAN',
                    bold: true,
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Telephone no. 606-1265',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'officialbarangaycaramutan123@yahoo.com.ph',
                    underline: { type: UnderlineType.SINGLE },
                    break: 1,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo2,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
                        offset: -1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            position: {
              spacing: {
                before: 600,
              },
            },
            children: [
              new TextRun({
                text: 'OFFICE OF THE BARANGAY COUNCIL',
                size: 28,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 600,
            },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'CERTIFICATION OF INDIGENCY',
                size: 48,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 1600,
            },
            children: [
              new TextRun({
                text: 'TO WHOM IT MAY CONCERN:',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    This is to certify that the name and other information below of legal age, is a certified indigent whose family income cannot suffice to compensate any supplementary expenses other than their daily expenditures.',
                size: 22,
              }),
              // new TextRun({
              //   text: ``,
              //   size: 22,
              // }),
              // new TextRun({
              //   text: `  ${firstName} ${middleName} ${lastName}  `,
              //   size: 22,
              //   underline: {
              //     type: UnderlineType.THICK,
              //     color: '000000',
              //   },
              // }),
              // new TextRun({
              //   text: `, `,
              //   size: 22,
              // }),
              // new TextRun({
              //   text: `  ${age} `,
              //   size: 22,
              //   underline: {
              //     type: UnderlineType.THICK,
              //     color: '000000',
              //   },
              // }),
              // new TextRun({
              //   text: 'years of age, ',
              //   size: 22,
              // }),
              // new TextRun({
              //   text: ` ${status} `,
              //   size: 22,
              //   underline: {
              //     type: UnderlineType.THICK,
              //     color: '000000',
              //   },
              // }),
              // new TextRun({
              //   text: ` ${status} a natural born Filipino, is a bona fide resident of Barangay Caramutan, La Paz, Tarlac.`,
              //   size: 22,
              // }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: '    NAME		     :      ',
                size: 28,
                bold: true,
              }),
              new TextRun({
                text: ` ${firstName} ${middleName} ${lastName}  `,
                size: 28,
                bold: true,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: '    ADDRESS		  :      ',
                size: 28,
                bold: true,
              }),
              new TextRun({
                text: ` Purok ${purok} Caramutan, La Paz, Tarlac `,
                size: 28,
                bold: true,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: '    PURPOSE		  :        ______________________________',
                size: 28,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                size: 22,
                text: '     This Certification of Indigence is being issued on verbal request of Mr./Mrs. ',
                bold: true,
              }),
              new TextRun({
                text: `   ${firstName} ${middleName} ${lastName}  `,
                size: 28,
                bold: true,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
              }),
              new TextRun({
                size: 22,
                text: '     his/her _________________	for whatever legal purposes it may serve.',
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                size: 22,
                text: ` Given this _________ day of	 _______________ , ${year} at the Office of the Barangay Chairman, Barangay Caramutan, La Paz Tarlac  `,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: `   ${capt}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                bold: true,
                size: 28,
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: 'PUNONG BARANGAY', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 800,
            },
            children: [
              new TextRun({
                text: 'NOTE: VALID ONLY WITH OFFICIAL DRY SEAL AND FOR A PERIOD OF ONLY SIX MONTHS FROM THE DATE ISSUED.',
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });
}

export async function BusinessPermit(
  firstName,
  lastName,
  middleName = '',
  age,
  status,
  capt,
  year,
  permit,
  validity,
  statusPermit,
  amount,
  ctc,
  ctcdate,
  or,
  ordate
) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date();
  let monthNow = month[d.getMonth()];

  const logo1 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/caramutan-logo.png'
  ).then((r) => r.blob());
  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/public/images/lapaz-logo.png'
  ).then((r) => r.blob());
  console.log('inside create');
  console.log(logo1);

  return new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo1,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.LEFT_MARGIN,
                        offset: 1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Republic of the Philippines',
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Province of Tarlac',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Municipality of La Paz',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'BARANGAY CARAMUTAN',
                    bold: true,
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'Telephone no. 606-1265',
                    break: 1,
                    size: 22,
                  }),
                  new TextRun({
                    text: 'officialbarangaycaramutan123@yahoo.com.ph',
                    underline: { type: UnderlineType.SINGLE },
                    break: 1,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logo2,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
                        offset: -1200000,
                      },
                      verticalPosition: {
                        relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        offset: 600000,
                      },
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            position: {
              spacing: {
                before: 600,
              },
            },
            children: [
              new TextRun({
                text: 'OFFICE OF THE PUNONG BARANGAY',
                size: 28,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 600,
            },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'BARANGAY BUSINESS PERMIT',
                size: 48,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 1200,
            },
            children: [
              new TextRun({
                text: 'Propietor:        ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: `${firstName} ${middleName} ${lastName}`,
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: 'Permit Number:        ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: `${permit}`,
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: 'Address:             ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: '  Brgy. Caramutan La Paz, Tarlac            ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: '     Valid Until:  ',
                size: 24,
              }),
              new TextRun({
                text: `${validity}`,
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: 'Business Location:    ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: 'Brgy. Caramutan La Paz, Tarlac',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: '       Amount Paid: ',
                size: 24,
              }),
              new TextRun({
                text: `Php${amount}.00`,
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: 'Status:           ',
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: `    ${statusPermit}`,
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    This Permit is being issued subject to existing rules and regulations, provided however, that the necessary fees are paid to the Treasurer of the Barangay as assessed. ',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    This is non-transferable and shall be deemed null and void upon failure by the owner to follow the said rules and regulations set forth by the Local Government Unit of La Paz, Tarlac. ',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 500,
              },
            ],
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: '    GIVEN',
                size: 22,
                allCaps: true,
              }),
              new TextRun({
                text: ` this ___ day of ${monthNow}, ${year} at Brgy.Caramutan, La Paz, Tarlac.`,
                size: 22,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 900,
            },
            children: [
              new TextRun({
                text: `   ${capt}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                bold: true,
                size: 28,
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.END,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: 'PUNONG BARANGAY', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: `  ${firstName} ${lastName}  `,
                size: 24,
                allCaps: true,
                bold: true,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({
                text: '       Owner',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({ text: `CTC #:    `, size: 24, bold: true }),
              new TextRun({
                text: ` ${ctc}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },

            children: [
              new TextRun({ text: `Issued on:    `, size: 24, bold: true }),
              new TextRun({
                text: ` ${ctcdate}   `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },

            children: [
              new TextRun({ text: `Issued at:    `, size: 24, bold: true }),
              new TextRun({
                text: ` Brgy. Caramutan, La Paz, Tarlac `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: `OR #:    `, size: 24, bold: true }),
              new TextRun({
                text: ` ${or} `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
            },
            children: [
              new TextRun({ text: `Issued on:    `, size: 24, bold: true }),
              new TextRun({
                text: ` ${ordate} `,
                underline: [
                  {
                    type: UnderlineType.SINGLE,
                  },
                ],
                size: 24,
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });
}
