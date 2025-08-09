import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50 font-manrope">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Answers to common questions about our platform, pricing, and support.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold">How accurate are the cost estimates?</AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm font-medium">
              Our estimates are based on real-time material costs and regional labor rates, ensuring high accuracy per location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-bold">Can I customize templates for different projects?</AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm font-medium">
              Yes. You can upload your own architectural plans or choose from customizable template libraries.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold">Is there a free trial available?</AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm font-medium">
              Absolutely. We offer a 14-day free trial with access to all core features. No credit card required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold">How secure is my project data?</AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm font-medium">
              All data is encrypted at rest and in transit. We use enterprise-grade security standards.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
