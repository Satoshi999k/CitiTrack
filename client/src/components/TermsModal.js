import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import './TermsModal.css';

function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="terms-close-btn" onClick={onClose} title="Close">
          <CloseIcon />
        </button>

        <h2>Terms and Conditions</h2>

        <div className="terms-body">
          <section>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using CitiTrack, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h3>2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on CitiTrack for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on CitiTrack</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h3>3. Disclaimer</h3>
            <p>
              The materials on CitiTrack are provided on an 'as is' basis. CitiTrack makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h3>4. Limitations</h3>
            <p>
              In no event shall CitiTrack or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CitiTrack, even if CitiTrack or a CitiTrack authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h3>5. Accuracy of Materials</h3>
            <p>
              The materials appearing on CitiTrack could include technical, typographical, or photographic errors. CitiTrack does not warrant that any of the materials on CitiTrack are accurate, complete, or current. CitiTrack may make changes to the materials contained on CitiTrack at any time without notice.
            </p>
          </section>

          <section>
            <h3>6. Links</h3>
            <p>
              CitiTrack has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CitiTrack of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h3>7. Modifications</h3>
            <p>
              CitiTrack may revise these terms of service for CitiTrack at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h3>8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Republic of the Philippines, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h3>9. User Responsibilities</h3>
            <p>
              Users are responsible for maintaining the confidentiality of their account information and password. Users agree to accept responsibility for all activities that occur under their account. Users agree to notify CitiTrack immediately of any unauthorized uses of their account.
            </p>
          </section>

          <section>
            <h3>10. Content Accuracy</h3>
            <p>
              Users agree that all information they provide about infrastructure issues must be accurate and truthful. CitiTrack reserves the right to remove any false, misleading, or inappropriate content.
            </p>
          </section>
        </div>

        <div className="terms-actions">
          <button className="terms-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
