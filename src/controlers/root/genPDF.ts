import asynchandler from 'express-async-handler';
import fs from 'fs';
import { printPage } from '@services/browser';
import { PassThrough } from 'stream';

// ------------------------------------------------------------------
// @route POST /api/gen-pdf
// @access Public
export const genPDF = asynchandler(async (req, res) => {
  const html = req.body.html as string;

  // console.log('HIT', html);
  try {
    const buffer = await printPage(html);

    fs.writeFileSync('output.pdf', buffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded-output.pdf');

    const readableStream = new PassThrough();
    readableStream.end(buffer).pipe(res);
  } catch (error: any) {
    res.status(500).json(error);
  }
});
