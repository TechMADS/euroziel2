export function openEnquiryModal() {
  window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
}