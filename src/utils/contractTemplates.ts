
export interface ContractRequiredFields {
  type: string;
  fields: {
    [key: string]: {
      label: string;
      type: 'text' | 'number' | 'select' | 'textarea' | 'date';
      required: boolean;
      placeholder?: string;
      options?: { value: string; label: string }[];
    };
  };
}

export const CONTRACT_TYPES = [
  {
    id: 'artist-manager',
    name: 'Artist-Manager Agreement',
    description: 'Contract between an artist and their manager outlining roles, responsibilities, and compensation.',
    icon: 'UserRoundCog',
  },
  {
    id: 'record-label',
    name: 'Record Label Contract',
    description: 'Agreement between an artist and a record label for recording, production, and distribution.',
    icon: 'Disc',
  },
  {
    id: 'producer',
    name: 'Producer Agreement',
    description: 'Contract between an artist and a producer outlining production services and payment terms.',
    icon: 'MusicNote',
  },
  {
    id: 'songwriter',
    name: 'Songwriter Agreement',
    description: 'Contract for songwriting services, addressing copyright ownership and royalties.',
    icon: 'PenTool',
  },
  {
    id: 'performance',
    name: 'Performance Contract',
    description: 'Agreement for live performances, detailing venue, payment, and requirements.',
    icon: 'Mic2',
  },
  {
    id: 'licensing',
    name: 'Music Licensing Agreement',
    description: 'Contract for licensing music for commercial use, such as in film, TV, or advertising.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 'distribution',
    name: 'Distribution Agreement',
    description: 'Contract for digital or physical distribution of music through various platforms.',
    icon: 'Share2',
  },
];

export const CONTRACT_FIELDS: { [key: string]: ContractRequiredFields } = {
  'artist-manager': {
    type: 'Artist-Manager Agreement',
    fields: {
      artist: {
        label: 'Artist Full Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., John Smith',
      },
      artistAddress: {
        label: 'Artist Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      manager: {
        label: 'Manager Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Jane Doe',
      },
      managerAddress: {
        label: 'Manager Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      percentage: {
        label: 'Commission Percentage',
        type: 'number',
        required: true,
        placeholder: '15',
      },
      term: {
        label: 'Contract Term (months)',
        type: 'number',
        required: true,
        placeholder: '12',
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., California',
      },
      additionalTerms: {
        label: 'Additional Terms',
        type: 'textarea',
        required: false,
        placeholder: 'Any additional terms or conditions...',
      },
    },
  },
  'record-label': {
    type: 'Record Label Contract',
    fields: {
      artist: {
        label: 'Artist/Band Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., The Sound Waves',
      },
      artistAddress: {
        label: 'Artist Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      label: {
        label: 'Record Label Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Epic Records',
      },
      labelAddress: {
        label: 'Label Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      albumCount: {
        label: 'Number of Albums',
        type: 'number',
        required: true,
        placeholder: '3',
      },
      royaltyRate: {
        label: 'Royalty Rate (%)',
        type: 'number',
        required: true,
        placeholder: '12',
      },
      advanceAmount: {
        label: 'Advance Amount ($)',
        type: 'number',
        required: true,
        placeholder: '25000',
      },
      term: {
        label: 'Contract Term (years)',
        type: 'number',
        required: true,
        placeholder: '3',
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., New York',
      },
      additionalTerms: {
        label: 'Additional Terms',
        type: 'textarea',
        required: false,
        placeholder: 'Any additional terms or conditions...',
      },
    },
  },
  'producer': {
    type: 'Producer Agreement',
    fields: {
      artist: {
        label: 'Artist Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., John Smith',
      },
      producer: {
        label: 'Producer Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Beat Master',
      },
      producerAddress: {
        label: 'Producer Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      projectName: {
        label: 'Project Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Summer Album',
      },
      trackCount: {
        label: 'Number of Tracks',
        type: 'number',
        required: true,
        placeholder: '10',
      },
      feePerTrack: {
        label: 'Fee Per Track ($)',
        type: 'number',
        required: true,
        placeholder: '2000',
      },
      royaltyPercentage: {
        label: 'Royalty Percentage',
        type: 'number',
        required: true,
        placeholder: '3',
      },
      completionDate: {
        label: 'Expected Completion Date',
        type: 'date',
        required: true,
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., Tennessee',
      },
    },
  },
  'songwriter': {
    type: 'Songwriter Agreement',
    fields: {
      songwriter: {
        label: 'Songwriter Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Lyric Master',
      },
      client: {
        label: 'Client Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., John Smith or Record Label',
      },
      songCount: {
        label: 'Number of Songs',
        type: 'number',
        required: true,
        placeholder: '5',
      },
      publishingRights: {
        label: 'Publishing Rights',
        type: 'select',
        required: true,
        options: [
          { value: 'full', label: 'Full transfer to client' },
          { value: 'shared', label: 'Shared 50/50' },
          { value: 'songwriter', label: 'Songwriter retains rights' },
        ],
      },
      paymentStructure: {
        label: 'Payment Structure',
        type: 'select',
        required: true,
        options: [
          { value: 'flat', label: 'Flat fee' },
          { value: 'royalty', label: 'Royalty-based' },
          { value: 'hybrid', label: 'Hybrid (flat fee + royalty)' },
        ],
      },
      flatFeeAmount: {
        label: 'Flat Fee Amount ($)',
        type: 'number',
        required: false,
        placeholder: '1000',
      },
      royaltyPercentage: {
        label: 'Royalty Percentage',
        type: 'number',
        required: false,
        placeholder: '5',
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., California',
      },
    },
  },
  'performance': {
    type: 'Performance Contract',
    fields: {
      artist: {
        label: 'Artist/Band Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., The Sound Waves',
      },
      venue: {
        label: 'Venue Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Madison Square Garden',
      },
      venueAddress: {
        label: 'Venue Address',
        type: 'text',
        required: true,
        placeholder: 'Full address',
      },
      venueContact: {
        label: 'Venue Contact Person',
        type: 'text',
        required: true,
        placeholder: 'e.g., Venue Manager',
      },
      performanceDate: {
        label: 'Performance Date',
        type: 'date',
        required: true,
      },
      performanceTime: {
        label: 'Performance Time',
        type: 'text',
        required: true,
        placeholder: 'e.g., 8:00 PM',
      },
      duration: {
        label: 'Performance Duration (minutes)',
        type: 'number',
        required: true,
        placeholder: '90',
      },
      fee: {
        label: 'Performance Fee ($)',
        type: 'number',
        required: true,
        placeholder: '5000',
      },
      depositRequired: {
        label: 'Deposit Required (%)',
        type: 'number',
        required: true,
        placeholder: '50',
      },
      soundCheckTime: {
        label: 'Sound Check Time',
        type: 'text',
        required: true,
        placeholder: 'e.g., 4:00 PM',
      },
      specialRequirements: {
        label: 'Special Requirements',
        type: 'textarea',
        required: false,
        placeholder: 'Equipment, hospitality, etc.',
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., New York',
      },
    },
  },
  'licensing': {
    type: 'Music Licensing Agreement',
    fields: {
      licensor: {
        label: 'Licensor Name',
        type: 'text',
        required: true,
        placeholder: 'Artist or Rights Holder Name',
      },
      licensee: {
        label: 'Licensee Name',
        type: 'text',
        required: true,
        placeholder: 'Company or Individual licensing the music',
      },
      workTitle: {
        label: 'Work Title',
        type: 'text',
        required: true,
        placeholder: 'Song or Composition Title',
      },
      useType: {
        label: 'Type of Use',
        type: 'select',
        required: true,
        options: [
          { value: 'film', label: 'Film/Movie' },
          { value: 'tv', label: 'Television' },
          { value: 'commercial', label: 'Commercial Advertisement' },
          { value: 'video-game', label: 'Video Game' },
          { value: 'website', label: 'Website/Online' },
        ],
      },
      licenseType: {
        label: 'License Type',
        type: 'select',
        required: true,
        options: [
          { value: 'exclusive', label: 'Exclusive' },
          { value: 'non-exclusive', label: 'Non-exclusive' },
        ],
      },
      territory: {
        label: 'Territory',
        type: 'select',
        required: true,
        options: [
          { value: 'worldwide', label: 'Worldwide' },
          { value: 'north-america', label: 'North America' },
          { value: 'europe', label: 'Europe' },
          { value: 'asia', label: 'Asia' },
          { value: 'custom', label: 'Custom Territory' },
        ],
      },
      customTerritory: {
        label: 'Custom Territory Details',
        type: 'text',
        required: false,
        placeholder: 'Specify if custom territory selected',
      },
      duration: {
        label: 'License Duration (months)',
        type: 'number',
        required: true,
        placeholder: '12',
      },
      fee: {
        label: 'License Fee ($)',
        type: 'number',
        required: true,
        placeholder: '5000',
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., California',
      },
    },
  },
  'distribution': {
    type: 'Distribution Agreement',
    fields: {
      artist: {
        label: 'Artist/Label Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Artist or Independent Label Name',
      },
      distributor: {
        label: 'Distributor Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., DistroKid, CD Baby, TuneCore',
      },
      contentType: {
        label: 'Content Type',
        type: 'select',
        required: true,
        options: [
          { value: 'single', label: 'Single' },
          { value: 'ep', label: 'EP' },
          { value: 'album', label: 'Album' },
          { value: 'catalog', label: 'Entire Catalog' },
        ],
      },
      releaseTitle: {
        label: 'Release Title',
        type: 'text',
        required: true,
        placeholder: 'Title of the release',
      },
      distributionType: {
        label: 'Distribution Type',
        type: 'select',
        required: true,
        options: [
          { value: 'digital', label: 'Digital Only' },
          { value: 'physical', label: 'Physical Only' },
          { value: 'both', label: 'Digital and Physical' },
        ],
      },
      territory: {
        label: 'Territory',
        type: 'select',
        required: true,
        options: [
          { value: 'worldwide', label: 'Worldwide' },
          { value: 'custom', label: 'Custom Territory' },
        ],
      },
      customTerritory: {
        label: 'Custom Territory Details',
        type: 'text',
        required: false,
        placeholder: 'Specify if custom territory selected',
      },
      term: {
        label: 'Agreement Term (years)',
        type: 'number',
        required: true,
        placeholder: '2',
      },
      revenueShare: {
        label: 'Artist Revenue Share (%)',
        type: 'number',
        required: true,
        placeholder: '80',
      },
      exclusivity: {
        label: 'Exclusivity',
        type: 'select',
        required: true,
        options: [
          { value: 'exclusive', label: 'Exclusive' },
          { value: 'non-exclusive', label: 'Non-exclusive' },
        ],
      },
      state: {
        label: 'Governing State',
        type: 'text',
        required: true,
        placeholder: 'e.g., California',
      },
    },
  },
};

export const generateContract = (type: string, details: any): string => {
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  
  let contract = '';
  
  switch (type) {
    case 'artist-manager':
      contract = `
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
      break;
      
    case 'record-label':
      contract = `
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
      break;
      
    // Add additional contract type templates as needed
    
    default:
      contract = 'Contract generation error. Please select a valid contract type.';
  }
  
  return contract;
};
