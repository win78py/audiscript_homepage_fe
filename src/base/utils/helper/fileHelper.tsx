// 'use client';
// import { Document, Image, Page, pdf, Text, View } from '@react-pdf/renderer';
// import { toJpeg, toPng } from 'html-to-image';

// const DOM_SCALE_RATIO = 0.8;

// export const getPdfFromHTMLs = async (pages: HTMLElement[] | HTMLElement | NodeListOf<Element>) => {
//   try {
//     const elements = pages instanceof NodeList || Array.isArray(pages) ? Array.from(pages) : [pages];

//     // Convert each element into an image with high resolution
//     const imagesWithSizes = await Promise.all(
//       elements.map(async (element) => {
//         const { width, height } = element.getBoundingClientRect();
//         const imgData = await toJpeg(element as HTMLElement, { quality: 1.0, pixelRatio: DOM_SCALE_RATIO }); // Higher resolution

//         return { imgData, width: width * DOM_SCALE_RATIO, height: height * DOM_SCALE_RATIO }; // Scale up for better clarity
//       })
//     );

//     const MyDocument = () => (
//       <Document>
//         {imagesWithSizes.map(({ imgData, width, height }, index) => {
//           return (
//             <Page key={index} size={{ width, height }} style={{ display: 'flex', justifyContent: 'center' }}>
//               <View style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
//                 <Image src={imgData} style={{ width: '100%', height: '100%' }} />
//               </View>
//             </Page>
//           );
//         })}
//       </Document>
//     );

//     return await pdf(<MyDocument />).toBlob();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     return null;
//   }
// };

// export function downloadBlobAsFile(blob: Blob, fileName: string) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = fileName;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   URL.revokeObjectURL(url); // Clean up
// }

// export function base64ToBlob(base64: string, contentType = 'image/png'): Blob {
//   const byteCharacters = atob(base64.split(',')[1]); // remove the "data:image/png;base64," prefix
//   const byteArrays = [];

//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteArrays.push(byteCharacters.charCodeAt(i));
//   }

//   const byteArray = new Uint8Array(byteArrays);
//   return new Blob([byteArray], { type: contentType });
// }
