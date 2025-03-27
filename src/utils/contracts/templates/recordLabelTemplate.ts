
export const generateRecordLabelContract = (details: any): string => {
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  
  return `
RECORD LABEL AGREEMENT

THIS RECORD LABEL AGREEMENT (the "Agreement") is made and entered into as of ${formattedDate} (the "Effective Date"), by and between:

${details.label} ("Label"), with a principal address at ${details.labelAddress},

and

${details.artist} ("Artist"), with a principal address at ${details.artistAddress}.

WITNESSETH:

WHEREAS, Label is engaged in the business of producing, manufacturing, distributing, and selling phonograph records and digital recordings; and

WHEREAS, Artist desires to render exclusive recording services for Label, and Label desires to engage Artist to render such services, in accordance with the terms and conditions hereinafter set forth.

NOW, THEREFORE, in consideration of the foregoing premises and the mutual covenants hereinafter contained, the parties hereto agree as follows:

1. TERM

   1.1 The initial term of this Agreement shall commence on the Effective Date and shall continue for a period of ${details.term} years thereafter (the "Initial Term").
   
   1.2 Label shall have the option to extend the Term for additional periods (each, an "Option Period") by providing written notice to Artist no later than thirty (30) days prior to the expiration of the Initial Term or the then-current Option Period, as applicable.

2. RECORDING COMMITMENT

   2.1 During the Term, Artist shall record and deliver to Label a total of ${details.albumCount} albums (each, an "Album").
   
   2.2 Each Album shall consist of a minimum of ten (10) master recordings of different musical compositions, each of a recording quality satisfactory to Label and suitable for commercial release.
   
   2.3 Artist shall deliver each Album to Label according to the following schedule:
       (a) First Album: within six (6) months of the Effective Date;
       (b) Subsequent Albums: within twelve (12) months of Label's acceptance of the immediately preceding Album.

3. OWNERSHIP OF RECORDINGS

   3.1 All master recordings created by Artist under this Agreement, together with all reproductions derived therefrom, and all copyrights therein and thereto, shall be the sole property of Label, free from any claims by Artist or any other person, throughout the world and in perpetuity.
   
   3.2 Label shall have the exclusive right to copyright such master recordings in its name as the owner and author thereof.
   
   3.3 Artist hereby waives any and all moral rights that Artist may have in and to the master recordings.

4. RECORDING PROCEDURE

   4.1 Each Album shall be recorded at such times and places as designated by Label, in consultation with Artist.
   
   4.2 Label shall pay for the costs of recording each Album, including studio fees, engineers, producers, and other necessary personnel, up to a maximum recording budget to be mutually agreed upon by Label and Artist.
   
   4.3 Any costs exceeding the agreed-upon recording budget shall be recoupable advances against Artist's royalties.

5. ADVANCES

   5.1 Upon execution of this Agreement, Label shall pay Artist an advance in the amount of $${details.advanceAmount}, which shall be recoupable from royalties payable to Artist hereunder.
   
   5.2 Upon commencement of recording of each Album, Label shall pay Artist an additional advance in an amount to be mutually agreed upon by Label and Artist, which shall be recoupable from royalties payable to Artist hereunder.

6. ROYALTIES

   6.1 Label shall pay Artist royalties in the amount of ${details.royaltyRate}% of the retail price of all records sold and paid for in the United States, less returns and reserves against returns.
   
   6.2 Label shall pay Artist royalties in the amount of ${details.royaltyRate / 2}% of the retail price of all records sold and paid for outside the United States, less returns and reserves against returns.
   
   6.3 Label shall pay Artist ${details.royaltyRate / 2}% of all digital downloads and streams, as calculated in accordance with Label's standard practices.
   
   6.4 Royalties shall be payable on a semi-annual basis, within sixty (60) days after the end of each calendar semester, together with a statement of account showing the calculation of such royalties.
   
   6.5 All royalties shall be subject to recoupment of advances and recording costs as provided herein.

7. ARTIST'S SERVICES

   7.1 During the Term, Artist shall:
       (a) Record each Album in accordance with the terms of this Agreement;
       (b) Participate in a reasonable number of promotional appearances, interviews, and performances to promote the Albums;
       (c) Cooperate with Label in the publicity and promotion of the Albums;
       (d) Not perform for the purpose of making records for any person or entity other than Label.

8. MECHANICAL LICENSES

   8.1 With respect to musical compositions written or controlled by Artist that are embodied on records released hereunder, Artist hereby grants to Label mechanical licenses for such compositions at a rate equal to seventy-five percent (75%) of the statutory mechanical royalty rate in effect in the United States at the time of release.

9. TERMINATION

   9.1 Label shall have the right to terminate this Agreement upon thirty (30) days' written notice to Artist in the event of Artist's material breach of this Agreement, provided that such breach is not cured within such thirty (30) day period.
   
   9.2 In the event of termination of this Agreement for any reason, Label shall retain all rights in and to the master recordings created by Artist during the Term.

10. INDEMNIFICATION

    10.1 Artist shall indemnify and hold Label harmless from and against any and all claims, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of any breach by Artist of any representation, warranty, or agreement made by Artist herein.
    
    10.2 Label shall indemnify and hold Artist harmless from and against any and all claims, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of any breach by Label of any representation, warranty, or agreement made by Label herein.

11. MISCELLANEOUS

    11.1 This Agreement contains the entire understanding of the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, between the parties with respect to such subject matter.
    
    11.2 This Agreement may not be amended, modified, or supplemented except by a written instrument executed by both parties.
    
    11.3 This Agreement shall be governed by and construed in accordance with the laws of the State of ${details.state}, without giving effect to any conflict of laws principles.
    
    11.4 Any dispute arising out of or relating to this Agreement shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.
    
    11.5 This Agreement shall inure to the benefit of and be binding upon the parties hereto and their respective heirs, executors, administrators, successors, and permitted assigns.
    
    11.6 Artist may not assign this Agreement without Label's prior written consent. Label may assign this Agreement to any parent, subsidiary, or affiliated company, or to any successor in interest to Label's business without Artist's consent.

${details.additionalTerms ? `Additional Terms: ${details.additionalTerms}` : ''}

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.

LABEL:
${details.label}
By: ________________________
Name: ________________________
Title: ________________________
Date: ________________________

ARTIST:
${details.artist}
Signature: ________________________
Date: ________________________
`;
};
