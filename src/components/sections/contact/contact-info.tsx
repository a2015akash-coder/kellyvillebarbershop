"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PHONE_NUMBER, PHONE_LINK } from "@/lib/constants";

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <Icon size={18} />
          </span>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="mt-5 space-y-2 text-slate-700">{children}</div>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <section className="bg-slate-50 section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Contact Details
          </h2>
          <p className="mt-4 text-base text-slate-700 sm:text-lg">
            Everything you need to know before visiting — location, contact
            details, and opening hours.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Phone */}
          <InfoCard icon={Phone} title="Phone">
            <a
              href={PHONE_LINK}
              className="text-lg font-semibold text-slate-900 transition hover:text-orange-600"
            >
              {PHONE_NUMBER}
            </a>
            <p className="text-sm text-slate-700">
              Call us for quick questions or availability.
            </p>
          </InfoCard>

          {/* Email */}
          <InfoCard icon={Mail} title="Email">
            <a
              href="mailto:groomingroombarber@gmail.com"
              className="break-all font-medium text-orange-600 underline underline-offset-4 transition hover:text-orange-700"
            >
              groomingroombarber@gmail.com
            </a>
            <p className="text-sm text-slate-500">
              For general enquiries only.
            </p>
          </InfoCard>

          {/* Opening Hours */}
          <InfoCard icon={Clock} title="Opening Hours">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Mon, Tue, Wed &amp; Fri</span>
                <span className="font-medium">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday</span>
                <span className="font-medium">09:00 – 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">09:00 – 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">09:00 – 16:00</span>
              </div>
            </div>
            <p className="pt-2 text-sm text-slate-500">
              Walk-ins welcome during business hours.
            </p>
          </InfoCard>

          {/* Address */}
          <InfoCard icon={MapPin} title="Address">
            <p className="leading-relaxed">
              90 Wrights Road,
              <br />
              Kellyville, New South Wales 2155,
              <br />
              Australia
            </p>
            <p className="text-sm text-slate-500">
              Easy access with nearby parking available.
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
