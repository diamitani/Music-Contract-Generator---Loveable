
export const generateArtistManagerContract = (details: any): string => {
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  
  return `
ARTIST-MANAGER AGREEMENT

THIS ARTIST-MANAGER AGREEMENT (the "Agreement") is made and entered into as of ${formattedDate} (the "Effective Date"), by and between:

${details.artist} ("Artist"), with a principal address at ${details.artistAddress},

and

${details.manager} ("Manager"), with a principal address at ${details.managerAddress}.

WITNESSETH:

WHEREAS, Artist is a professional recording and performing artist; and

WHEREAS, Artist wishes to engage Manager as Artist's personal manager, and Manager wishes to serve as Artist's personal manager, in accordance with the terms and conditions hereinafter set forth.

NOW, THEREFORE, in consideration of the foregoing premises and the mutual covenants hereinafter contained, the parties hereto agree as follows:

1. TERM

   1.1 The term of this Agreement shall commence on the Effective Date and shall continue for a period of ${details.term} months thereafter (the "Term"), unless earlier terminated in accordance with the provisions of this Agreement.

2. MANAGER'S SERVICES

   2.1 During the Term, Manager shall use reasonable efforts to advise, counsel, and direct Artist in the development and enhancement of Artist's professional career in all branches of the entertainment industry.

   2.2 Manager shall use reasonable efforts to:
       (a) Advise and counsel Artist in the selection of literary, artistic, and musical material;
       (b) Advise and counsel Artist in matters relating to publicity, public relations, and advertising;
       (c) Advise and counsel Artist in matters relating to engaging, employing, or contracting with persons, firms, or corporations to act as Artist's agent, business manager, attorneys, accountants, and the like;
       (d) Advise and counsel Artist in matters relating to the selection of theatrical agencies, publicity agencies, and others who may provide professional services to Artist;
       (e) Advise and counsel Artist with respect to general practices in the entertainment industry.

3. MANAGER'S AUTHORITY

   3.1 Artist hereby authorizes Manager to render the foregoing services on Artist's behalf and to do any and all acts that Manager reasonably deems necessary to fulfill Manager's obligations hereunder.

   3.2 Notwithstanding anything contained herein to the contrary, Manager shall not have the right to enter into any contracts or agreements binding on Artist without Artist's prior written consent.

4. ARTIST'S OBLIGATIONS

   4.1 Artist shall:
       (a) Inform Manager of all matters that may affect Artist's professional career as soon as reasonably possible;
       (b) Respond to all communications from Manager as soon as reasonably possible;
       (c) Provide Manager with copies of all agreements and engagements related to Artist's professional career;
       (d) Pay all required taxes, insurance, and other costs associated with Artist's career.

5. COMPENSATION

   5.1 As compensation for Manager's services hereunder, Artist agrees to pay Manager a commission equal to ${details.percentage}% of Artist's "Gross Earnings" during the Term and any applicable commission tail period.

   5.2 "Gross Earnings" shall mean the total of all earnings, fees, royalties, gifts, and gratuities received by Artist, directly or indirectly, for Artist's activities in the entertainment industry, including, without limitation:
       (a) Earnings from live performances;
       (b) Earnings from record sales, streams, and digital downloads;
       (c) Earnings from songwriting and publishing;
       (d) Earnings from merchandising;
       (e) Earnings from endorsements and sponsorships;
       (f) Earnings from any other entertainment-related activities.

   5.3 Artist shall pay Manager the commission set forth herein within fifteen (15) days after Artist's receipt of the applicable Gross Earnings.

6. BOOKS AND RECORDS

   6.1 Manager shall maintain accurate books of account concerning all transactions on Artist's behalf.

   6.2 Artist shall have the right to examine such books and records at Manager's regular place of business upon reasonable notice.

7. TERMINATION

   7.1 This Agreement may be terminated by mutual agreement of the parties.

   7.2 Either party may terminate this Agreement upon thirty (30) days' written notice to the other party in the event of a material breach of this Agreement by such other party, provided that such breach is not cured within such thirty (30) day period.

8. POST-TERMINATION COMMISSION

   8.1 In the event of termination of this Agreement for any reason other than Manager's material breach, Manager shall be entitled to receive commissions on Gross Earnings received by Artist after the termination date for:
       (a) Engagements, contracts, or commitments entered into during the Term;
       (b) Extensions, renewals, or modifications of engagements, contracts, or commitments entered into during the Term.

9. INDEMNIFICATION

   9.1 Artist shall indemnify and hold Manager harmless from and against any and all claims, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of any breach by Artist of any representation, warranty, or agreement made by Artist herein.

   9.2 Manager shall indemnify and hold Artist harmless from and against any and all claims, damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of any breach by Manager of any representation, warranty, or agreement made by Manager herein.

10. INDEPENDENT CONTRACTOR

    10.1 The relationship between Artist and Manager is that of independent contractors. Nothing in this Agreement shall be construed as creating a partnership, joint venture, agency, or employment relationship between the parties.

11. MISCELLANEOUS

    11.1 This Agreement contains the entire understanding of the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, between the parties with respect to such subject matter.

    11.2 This Agreement may not be amended, modified, or supplemented except by a written instrument executed by both parties.

    11.3 This Agreement shall be governed by and construed in accordance with the laws of the State of ${details.state}, without giving effect to any conflict of laws principles.

    11.4 Any dispute arising out of or relating to this Agreement shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.

    11.5 This Agreement shall inure to the benefit of and be binding upon the parties hereto and their respective heirs, executors, administrators, successors, and permitted assigns.

    11.6 Artist may not assign this Agreement without Manager's prior written consent. Manager may not assign this Agreement without Artist's prior written consent.

${details.additionalTerms ? `Additional Terms: ${details.additionalTerms}` : ''}

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.

ARTIST:
${details.artist}
Signature: ________________________
Date: ________________________

MANAGER:
${details.manager}
Signature: ________________________
Date: ________________________
`;
};
