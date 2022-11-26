import {
  AlignmentType,
  Document,
  Header,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  TextRun,
  TextWrappingType,
  UnderlineType,
  VerticalPositionRelativeFrom,
} from 'docx';

export default async function DocumentCreate() {
  const logo1 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/Client/public/images/caramutan-logo.png'
  ).then((r) => r.blob());
  const logo2 = await fetch(
    'https://raw.githubusercontent.com/SejiMe/profiling/main/Client/public/images/lapaz-logo.png'
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
            children: [
              new ImageRun({
                data: logo1,
                wrap: {
                  type: TextWrappingType.NONE,
                },
                transformation: { width: 500, height: 500 },
                horizontalPosition: {
                  relative: HorizontalPositionRelativeFrom.PAGE,
                  align: AlignmentType.CENTER,
                },
                verticalPosition: {
                  relative: VerticalPositionRelativeFrom.PAGE,
                  align: AlignmentType.CENTER,
                },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: 'Hello World The body content' }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });
}
